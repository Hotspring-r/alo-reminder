import { config as _config, configType } from './config';
export function start() {
    const config = getConfig();
    const calendar = CalendarApp.getCalendarById(config.calendarId);
    const today = new Date();
    const events = calendar.getEventsForDay(addDays(today, config.beforeDays));

    for (const eventIndex in events) {
        const event = events[eventIndex];

        const title = event.getTitle();
        const startTime = event.getStartTime();
        const location = event.getLocation();
        const description = event.getDescription();

        const subject = title + ' リマインド';
        const body = `${title}のリマインドです。\n日時:${dateToString(startTime)}\n場所:${location}\n${decodeHtml(description)}\n`;
        const options = { name: config.senderName, from: config.senderAddress };
        GmailApp.sendEmail(config.recipient, subject, body, options);
        console.info(body);
    }
}

function getConfig(): configType {
    try {
        return _config;
    }
    catch {
        return exports.config;
    }
}

function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

function dateToString(date: GoogleAppsScript.Base.Date) {
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${zeroPadding(date.getMinutes().toString(), 2)}`;
}

function zeroPadding(str: string, length: number) {
    return '0'.repeat(length - str.length) + str;
}

function decodeHtml(text: string) {
    return text
        .replace(/<br>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
}
