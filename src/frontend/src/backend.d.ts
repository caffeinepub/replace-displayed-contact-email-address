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
export enum ProductCategory {
    Accessories = "Accessories",
    Computers = "Computers",
    Communication = "Communication",
    Networking = "Networking",
    Services = "Services"
}
export interface backendInterface {
    addDocument(title: string, blob: ExternalBlob): Promise<string>;
    getAllAvailableProducts(): Promise<Array<Product>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllDocuments(): Promise<Array<Document>>;
    getAllProducts(): Promise<Array<Product>>;
    getDocument(id: string): Promise<Document>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
