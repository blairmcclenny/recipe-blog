import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6"
import Copyright from "./copyright"

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex gap-4 justify-center">
          <FaTiktok className="text-2xl text-tiktok" />
          <FaYoutube className="text-2xl text-tiktok" />
          <FaInstagram className="text-2xl text-tiktok" />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          &copy; <Copyright /> Lorem Ipsum
        </p>
      </div>
    </footer>
  )
}
