const sessionIdToUserMap = new Map()

function setUser(userId, user) {
    return sessionIdToUserMap.set(userId, user)
}

function getUser(userId) {
    return sessionIdToUserMap.get(userId)
}

export { setUser, getUser }