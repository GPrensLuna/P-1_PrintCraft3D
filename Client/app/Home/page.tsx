async function LoadProducts() {
    const res = await fetch(`https://p-1printcraft3d.up.railway.app/PrintCraft3D/Inventario`)
    const data = await res.json()
    console.log(data)
}

async function Home () {
    const post = await LoadProducts()

    return(
        <h1>
        hola
        </h1>
    )
}

export default Home