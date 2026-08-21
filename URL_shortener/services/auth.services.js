const sessionIdToUserMap = new Map()

function setUser(userId, user) {
    sessionIdToUserMap.set(userId, user)
}

function getUser(userId) {
    sessionIdToUserMap.get(userId)
}

export { setUser, getUser }