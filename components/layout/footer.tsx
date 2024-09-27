import Copyright from "./copyright"

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-gray-400">
          <Copyright /> Lorem Ipsum
        </p>
      </div>
    </footer>
  )
}
