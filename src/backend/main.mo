// No backend changes are required for connecting custom domains.
// Changes can be made entirely in the deployment and infrastructure layer.
//
// Please follow these domain-connection instructions.

//
// **Domain Connection Instructions for `pccomputerandcommunication.com`:**
//
// 1. **Add DNS CNAME Record**:
//    - Create a CNAME record pointing `www.pccomputerandcommunication.com`
//      to your `icp0.io` CNAME.
//    - This step allows both www (optional/legacy) and non-www access.
//
// 2. **Domain Verification with the Internet Computer**:
//    - No backend code changes needed. Verification is handled by the domain
//      registrar and the Internet Computer boundary nodes automatically.
//
// 3. **Access `https://pccomputerandcommunication.com`**:
//    - Once DNS propagation is complete, your site will be accessible via
//      the custom domain.
//    - Existing ICP-provided endpoint will remain functional.
//
// 4. **(Optional) Redirect non-www to www or vice versa**:
//    - You can configure redirection at your domain registrar if desired.
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Time "mo:core/Time";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

// Data migration after upgrade

actor {
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

  let products = Map.empty<Nat, Product>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let documents = Map.empty<Text, Document>();

  var productCounter = 0;
  var submissionCounter = 0;
  var documentCounter = 0;

  // Product Related Functions

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    let iter = products.values();
    let filteredIter = iter.filter(
      func(product) {
        product.category == category and product.isAvailable;
      }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getAllAvailableProducts() : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.isAvailable;
      }
    );
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Contact Submissions

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
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

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  // Documents

  public shared ({ caller }) func addDocument(title : Text, blob : Storage.ExternalBlob) : async Text {
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
    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?document) { document };
    };
  };

  public query ({ caller }) func getAllDocuments() : async [Document] {
    documents.values().toArray();
  };
};

