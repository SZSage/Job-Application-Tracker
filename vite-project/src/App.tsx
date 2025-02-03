
function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-sm text-center bg-gray-700 rounded-xl border-gray outline">
        <h1 className="text-3xl text-gray-200">About</h1>
        <p className="text-gray-200">Hello there</p>
      </div>
    </>
  )
}


function Button() {
  return (
    <button className="outline w-30 h-8 rounded-xl hover:bg-gray-700">Click here</button>
  );
}

interface Dict {
  id: number,
  title: string;
}

const products: Dict[]  = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id:2 },
  { title: "Potato", id:3 },
];

for (let i: number = 0; i < products.length; i++) {
  console.log(products[i])
}

function ListItems() {
    let nums = products.map(product =>
        <li
          key={product.id}
        >
          {product.title}
        </li>
    )
  return nums
}

function App() {
  return (
    <>
      <div>
        <AboutPage/>
        <Button/>
        <ul>{ListItems()}</ul>
      </div>
    </>
  )
}

export default App
