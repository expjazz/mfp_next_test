import { getAvtar } from "components/PageStyles/CelebrityId/PurchaseSection/utils"
import { getStarName } from "./dataToStringFormatter"

export const parseUserData = userData => {
  const full = {
    user: {
      ...userData.user,
      avatarPhoto: getAvtar(userData?.user.avatar_photo),
      starName: getStarName(
        userData?.user?.nick_name,
        userData?.user?.first_name,
        userData?.user?.last_name,
      )
    },
    celebrity_details: {
      ...userData.celebrity_details,
    },
    notificationCount: 0,
  }
  return full
}