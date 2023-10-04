

export default function Header({title}) {
  return (
    <div className="flex justify-between items-center pt-4 mb-4">
        <h2 className="font-bold">
            {title}
        </h2>
        <h2>
            welcome back, client
        </h2>
    </div>
  )
}
