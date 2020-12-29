import * as functions from 'firebase-functions';
import axios from 'axios';
import { AppUtil } from '../apputil';
import * as qs from 'qs';

export class NotifService {
    elasticmailUrl: string = functions.config().elasticemail.url;
    elasticmailApikey: string = functions.config().elasticemail.apikey;

    private async createData(): Promise<any> {
        const data: any = {};
        data.apikey = this.elasticmailApikey;
        data.from = 'noreply@niortweb.fr';
        data.fromName = 'NiortWeb.fr';
        data.isTransactional = true;
        data.sender = 'contact@niortweb.fr';
        data.senderName = 'niortweb.fr';
        return data;
    }

    public async send(templateName: string, to: string, subject: string, data: any): Promise<void> {
        AppUtil.debug("notif > send ", templateName, to, subject, data);
        const body = await this.createData();
        body.template = templateName;
        body.to = to;
        body.subject = subject;

        for (let [key, value] of Object.entries(data)) {
            body[`merge_${key}`] = `${value || ''}`;
        }

        AppUtil.debug('notif > send > axios post body', this.elasticmailUrl, body);
        const resp = await axios.post(this.elasticmailUrl, qs.stringify(body), {
            timeout: 10000
        });
        AppUtil.debug('notif > send > axios.post response', templateName, resp.status, resp.data);
    }
}


export default new NotifService();