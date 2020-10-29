export default class Analytics {
    constructor(analyticsId) {
        this.gtag = window.gtag;

        this.gtag('js', new Date());
        this.gtag('config', analyticsId, { 'send_page_view': false });
    }

    logEvent(category, action, label = '', value = 0) {
        console.log(`
category: ${category}
action: ${action}
label: ${label}
value: ${value}
        `)

        this.gtag('event', action, {
            'event_category': category,
            'event_action': action,
            'event_label': label,
            'value': value,
        })
    }
}