import { HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

export abstract class BaseService {

    protected UrlApiGateway: string = environment.apiGatewayUrl;

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }
}