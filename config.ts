export type configType = {
    calendarId: string,
    recipient: string,
    senderName: string,
    senderAddress: string,
    beforeDays: number[]
}

export const config = {
    calendarId: '*********@gmail.com',
    recipient: '*****@*****.com',
    senderName: '*********',
    senderAddress: "*****@******.com",
    beforeDays: [2,7]
} as configType;
