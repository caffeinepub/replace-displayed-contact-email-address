import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Product {
    id: bigint;
    name: string;
    createdAt: Time;
    isAvailable: boolean;
    description: string;
    imageUrl?: string;
    category: ProductCategory;
    image?: ExternalBlob;
    price?: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Document {
    id: string;
    title: string;
    blob: ExternalBlob;
    uploadDate: Time;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type OrderStatus = {
    __kind__: "pending";
    pending: null;
} | {
    __kind__: "completed";
    completed: null;
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface PaymentOrder {
    id: bigint;
    paymentStatus: OrderStatus;
    billingAddress: string;
    customerPrincipal?: Principal;
    createdAt: Time;
    fullName: string;
    amountCents?: bigint;
    paymentCurrency?: string;
    email: string;
    stripePaymentId?: string;
    phone: string;
    items: Array<ShoppingItem>;
}
export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
}
export enum ProductCategory {
    Accessories = "Accessories",
    Computers = "Computers",
    Communication = "Communication",
    Networking = "Networking",
    Services = "Services"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDocument(title: string, blob: ExternalBlob): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(email: string, phone: string, billingAddress: string, fullName: string, items: Array<ShoppingItem>, amountCents: bigint | null, paymentCurrency: string | null): Promise<bigint>;
    getAllAvailableProducts(): Promise<Array<Product>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllDocuments(): Promise<Array<Document>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDocument(id: string): Promise<Document>;
    getOrder(orderId: bigint): Promise<PaymentOrder>;
    getOrders(): Promise<Array<PaymentOrder>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(orderId: bigint, status: OrderStatus, stripeSessionId: string | null): Promise<void>;
}
