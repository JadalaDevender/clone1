public with sharing class Gateway {
    @AuraEnabled(cacheable=true)
    public static List<PaymentGateWay1__c> getObjectInfo() {
        List<PaymentGateWay1__c> gatewaylis= [
            SELECT Id,Default_Payment_Gateway_Setting__c
            FROM PaymentGateWay1__c
            WITH SECURITY_ENFORCED
        ];
        return gatewaylis;
        
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Product2> itemInfo() {
        List<Product2> items= [
            SELECT Id,Name
            FROM Product2
            WITH SECURITY_ENFORCED
        ];
        return items;
        
        
    }
   
}
