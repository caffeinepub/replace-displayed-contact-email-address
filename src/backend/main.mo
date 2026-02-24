import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let phoneNumber = "9315906829";
  let businessAddress = "37, Dahriya, Mukhani, Haldwani, Nainital, Uttarakhand, 263139";
  let facebookProfile = "https://www.facebook.com/profile.php?id=61575271824165";

  type ProductCategory = {
    #Computers;
    #Accessories;
    #Networking;
    #Communication;
    #Services;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    description : Text;
    price : ?Nat;
    image : ?Storage.ExternalBlob;
    imageUrl : ?Text; // New field for product image URL
    isAvailable : Bool;
    createdAt : Time.Time;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Document = {
    id : Text;
    title : Text;
    blob : Storage.ExternalBlob;
    uploadDate : Time.Time;
  };

  type PaymentOrder = {
    id : Nat;
    createdAt : Time.Time;
    stripePaymentId : ?Text;
    paymentStatus : OrderStatus;
    items : [Stripe.ShoppingItem];
    amountCents : ?Nat;
    paymentCurrency : ?Text;
    email : Text;
    phone : Text;
    billingAddress : Text;
    fullName : Text;
    customerPrincipal : ?Principal;
  };

  type OrderStatus = {
    #pending;
    #completed;
    #failed : { error : Text };
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    phone : ?Text;
  };

  let products = Map.empty<Nat, Product>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let documents = Map.empty<Text, Document>();
  let orders = Map.empty<Nat, PaymentOrder>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var productCounter = 0;
  var submissionCounter = 0;
  var documentCounter = 0;
  var orderIdCounter = 0;

  // Stripe configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Stripe Functions

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = getStripeConfiguration();
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = getStripeConfiguration();
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // User Profile Functions

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Related Functions

  // Admin-only: Add new product
  public shared ({ caller }) func addProduct(
    name : Text,
    category : ProductCategory,
    description : Text,
    price : ?Nat,
    image : ?Storage.ExternalBlob,
    imageUrl : ?Text,
    isAvailable : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let id = productCounter;
    productCounter += 1;

    let product : Product = {
      id;
      name;
      category;
      description;
      price;
      image;
      imageUrl;
      isAvailable;
      createdAt = Time.now();
    };

    products.add(id, product);
    id;
  };

  // Admin-only: Update existing product
  public shared ({ caller }) func updateProduct(
    id : Nat,
    name : Text,
    category : ProductCategory,
    description : Text,
    price : ?Nat,
    image : ?Storage.ExternalBlob,
    imageUrl : ?Text,
    isAvailable : Bool
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existingProduct) {
        let updatedProduct : Product = {
          id;
          name;
          category;
          description;
          price;
          image;
          imageUrl;
          isAvailable;
          createdAt = existingProduct.createdAt;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  // Admin-only: Delete product
  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.remove(id);
      };
    };
  };

  // Public: Get single product
  public query func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Public: Get products by category
  public query func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category and product.isAvailable });
  };

  // Public: Get all available products
  public query func getAllAvailableProducts() : async [Product] {
    products.values().toArray().filter(func(product) { product.isAvailable });
  };

  // Admin-only: Get all products (including unavailable)
  public query ({ caller }) func getAllProducts() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all products");
    };
    products.values().toArray();
  };

  // Contact Submissions

  // Public: Submit contact form
  public shared func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = submissionCounter.toText();
    submissionCounter += 1;

    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };

    contactSubmissions.add(id, submission);
  };

  // Admin-only: Get all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Documents (Admin-only)

  public shared ({ caller }) func addDocument(title : Text, blob : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add documents");
    };

    let id = documentCounter.toText();
    documentCounter += 1;

    let document : Document = {
      id;
      title;
      blob;
      uploadDate = Time.now();
    };

    documents.add(id, document);
    id;
  };

  public query ({ caller }) func getDocument(id : Text) : async Document {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view documents");
    };

    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?document) { document };
    };
  };

  public query ({ caller }) func getAllDocuments() : async [Document] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view documents");
    };
    documents.values().toArray();
  };

  // Order Management

  func getNewOrderId() : Nat {
    let id = orderIdCounter;
    orderIdCounter += 1;
    id;
  };

  // Admin-only: Get all orders
  public query ({ caller }) func getOrders() : async [PaymentOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  // Public: Create order (anyone can initiate checkout)
  public shared ({ caller }) func createOrder(email : Text, phone : Text, billingAddress : Text, fullName : Text, items : [Stripe.ShoppingItem], amountCents : ?Nat, paymentCurrency : ?Text) : async Nat {
    let id = getNewOrderId();
    let customerPrincipal = if (caller.isAnonymous()) { null } else { ?caller };

    let order : PaymentOrder = {
      id;
      createdAt = Time.now();
      items;
      amountCents;
      paymentCurrency;
      email;
      phone;
      billingAddress;
      fullName;
      stripePaymentId = null;
      paymentStatus = #pending;
      customerPrincipal;
    };
    orders.add(id, order);
    id;
  };

  // Admin-only: Update order status
  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus, stripeSessionId : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updated : PaymentOrder = {
          order with paymentStatus = status;
          stripePaymentId = stripeSessionId;
        };
        orders.add(orderId, updated);
      };
    };
  };

  // Owner or Admin: Get specific order
  public query ({ caller }) func getOrder(orderId : Nat) : async PaymentOrder {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        // Allow access if: admin OR order owner (if authenticated)
        let isOwner = switch (order.customerPrincipal) {
          case (null) { false };
          case (?principal) { principal == caller };
        };

        if (not (AccessControl.isAdmin(accessControlState, caller) or isOwner)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };

        order;
      };
    };
  };

  // User-only: Get caller's orders
  public query ({ caller }) func getMyOrders() : async [PaymentOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their orders");
    };

    orders.values().toArray().filter(func(order) {
      switch (order.customerPrincipal) {
        case (null) { false };
        case (?principal) { principal == caller };
      };
    });
  };
};
