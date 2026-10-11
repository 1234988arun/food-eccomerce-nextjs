import Product from "../../../pages/ViewProduct"

const Page = async({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
  return (
    <>
        <Product id={id} />
    </>
  )
}

export default Page
