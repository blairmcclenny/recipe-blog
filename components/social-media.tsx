import { getSocialMedia } from "@/lib/queries/social-media"
import { draftMode } from "next/headers"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6"

export default async function SocialMedia() {
  const { isEnabled } = draftMode()

  const data = await getSocialMedia({
    limit: 1,
    isDraftMode: isEnabled,
  })
  const socialMedia = data?.socialMediaCollection?.items?.[0]

  if (!socialMedia) {
    return null
  }

  return (
    <div className="flex gap-4 justify-center">
      {socialMedia?.tikTok && (
        <a href={socialMedia.tikTok} target="_blank" rel="noopener noreferrer">
          <FaTiktok className="text-2xl text-tiktok" />
        </a>
      )}
      {socialMedia?.youTube && (
        <a href={socialMedia.youTube} target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-2xl text-tiktok" />
        </a>
      )}
      {socialMedia?.instagram && (
        <a
          href={socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-2xl text-tiktok" />
        </a>
      )}
    </div>
  )
}
