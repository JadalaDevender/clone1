import { LightningElement, wire,api, track} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PAYMENTGATEWAY_OBJECT from '@salesforce/schema/PaymentGateways__c';
import GatewayType_FIELD from '@salesforce/schema/PaymentGateways__c.GatewayTypes__c';
import itemInfo from '@salesforce/apex/Gateway.itemInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns=[
   
    {
      label: 'Product Names',
      fieldName: 'Name',
      sortable: 'true',
  }
]

export default class paymentGateway  extends LightningElement {
    @track selectedValue;
    @track options = [];
    @track wireProduct =[];
    @track blogFieldValue =true;
    @track blogFieldValue1=true;
    @track blogFieldValue3=true;
    @track blogFieldValue5=true;
    @api recordId;
    error;  
    @api objectApiName;
    @track columns = columns;
    selectedOption;
    @wire(getObjectInfo, { objectApiName:PAYMENTGATEWAY_OBJECT })
    objectInfo;
    // Getting Account Type Picklist values using wire service
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: GatewayType_FIELD})
    typePicklistValues({error, data}) {
        if(data) {
            let optionsValues = [];
            for(let i = 0; i < data.values.length; i++) {
                optionsValues.push({
                    label: data.values[i].label,
                    value: data.values[i].value    
                })   
            }
            this.options = optionsValues;
            window.console.log('optionsValues ===> '+JSON.stringify(optionsValues));
          
            
        }
        else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }
        
    }
   handleChange(event) {
        this.selectedOption = event.detail.value;
        console.log('event detailes===> '+event.detail.value);
        
    }

    // handle the selected value
   
    handleClick() {
       
        //this.handleChange(event);
        if (this.selectedOption == 'Default Payment Gateway Setting')
        {
            //this.blogFieldValue = false;
            this.blogFieldValue1 = true;
            this.blogFieldValue3 = true;
            this.blogFieldValue5 = true;
            
        }
        else if (this.selectedOption == 'Paytm')
        {
            this.blogFieldValue1 = false;
            this.blogFieldValue = true;
            this.blogFieldValue3 = true;
            this.blogFieldValue5 = true;
        }
        else if (this.selectedOption == 'paypal')
        {
            this.blogFieldValue1 = true;
            this.blogFieldValue = true;
            this.blogFieldValue3 = false;
            this.blogFieldValue5 = true;
        }
        else if (this.selectedOption == 'Card')
        {
            this.blogFieldValue1 = true
            this.blogFieldValue = false;
            this.blogFieldValue3 = true;
            this.blogFieldValue5 = false;
        }
        this.blogFieldValue2 = true;
        
    }
    handleClick1() {
        this.blogFieldValue5 = true;
        this.blogFieldValue = true;

    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.blogFieldValue = true;
        this.blogFieldValue3 = true;
        this.blogFieldValue5 = true;
    }
    connectedCallback()
    {
        itemInfo()
        .then((result,error) => {
            if (result) {
               this.wireProduct=result;
            } else if (error) {
                console.error(error);
            }
        })
    }
    handleRowSelection = event => {
        var selectedRows=event.detail.selectedRows;
        if(selectedRows.length>1)
        {
            var el = this.template.querySelector('lightning-datatable');
            selectedRows=el.selectedRows=el.selectedRows.slice(1);
            this.showNotification();
            event.preventDefault();
            return;
        }
    }
    showNotification() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Only one row can be selected',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(event);
    }
}