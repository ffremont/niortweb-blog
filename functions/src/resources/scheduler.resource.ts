import { Request, Response } from 'express';
import scheduleService from '../services/schedule.service';
import { AppUtil } from '../apputil';
import * as functions from 'firebase-functions';

class SchedulerResource{

    public async heatbeat(request: Request, response: Response) {
        const {apikey} = request.query;
        if(apikey !== functions.config().scheduler.apikey){
            AppUtil.notAuthorized(response);return;
        }

        try{
            await Promise.all([
                scheduleService.notifyParticipant(),
                scheduleService.askReview()
            ]);
            
            AppUtil.info('heatbeat ok');
            AppUtil.ok(response);
        }catch(e){
            AppUtil.error('scheduler in error',e);
            AppUtil.internalError(response,e);
        }       
    }
}


export default new SchedulerResource();