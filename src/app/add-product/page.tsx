import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
    tittle: "Add Product - BCJewelry"
}

async function addProduct(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    const name = formData.get("name")?.toString();
    const category = formData.get("category")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const certificate = formData.get("certificate")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !category || !description || !imageUrl || !certificate || !price) {
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: { name, category, description, imageUrl, certificate, price },
    })

    redirect("/");
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    return (
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={addProduct}>
                <input
                    required
                    name="name"
                    placeholder="Name"
                    className="input-bordered input mb-3 w-full" //ctrl + D to change all margin at the same time
                />
                <select
                    required
                    name="category"
                    className="select-bordered select mb-3 w-full"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    <option value="ring">Ring</option>
                    <option value="necklace">Necklace</option>
                </select>
                <textarea
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea-bordered textarea mb-3 w-full"
                />
                <input
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    type="url"
                    className="input-bordered input mb-3 w-full"
                />
                <input
                    required
                    name="certificate"
                    placeholder="Certificate"
                    className="input-bordered input mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input-bordered input mb-3 w-full"
                />

                {/*<input
                    required
                    name="image"
                    type="file"
                    accept="image/*"
                    className="input-bordered input mb-3 w-full"
                    onChange={handleImageChange}
                />*/}

                <FormSubmitButton className="btn-block" type="submit">
                    Add Product
                </FormSubmitButton>
            </form>
        </div>
    )
}


