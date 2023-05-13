import moment from "moment";
const checkAvailable = async (user) => {
    const current = moment().subtract("24","hour").format()
    if (user.active.isAvailble) {
        return true;
    } else {
        if (user.active.updateTime === current) {
            user.active.isAvailble = true
            await user.save()
            return true
        }
        else {
            return false
        }
    }
}
export default checkAvailable