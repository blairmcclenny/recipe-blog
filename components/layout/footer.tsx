export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sticky Footer
        </p>
      </div>
    </footer>
  )
}
