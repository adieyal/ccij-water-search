import {Observable} from '../utils'

export default class FeedbackWidget extends Observable {
    constructor() {
        super();
        this.prepareDOM();
    }

    prepareDOM() {
        this.thumbsUp = $('#feedback-positive');
        this.thumbsDown = $('#feedback-nagative');
        this.dismiss = $('#feedback-dismiss');

        this.thumbsUp.click(ev => {
            this.triggerEvent('feedbackwidget.thumbsup')
        })

        this.thumbsDown.click(ev => {
            this.triggerEvent('feedbackwidget.thumbsdown')
        })

        this.dismiss.click(ev => {
            this.triggerEvent('feedbackwidget.dismiss')
        })
    }
}