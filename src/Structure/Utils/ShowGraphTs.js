class ShowGraphTs{

    static numberOfReport = 0;
    static listReports = [];

    static clean(){
        ShowGraphTs.numberOfReport = 0;
        ShowGraphTs.listReports = [];
    }

    static getNumberReport(){
        ShowGraphTs.numberOfReport++;
        return ShowGraphTs.numberOfReport;
    }

    static addReports(node){
        ShowGraphTs.listReports.push(node);
    }

    static getReports(){
        return ShowGraphTs.listReports;
    }

    static existReport(){
        return ShowGraphTs.listReports.length > 0 ? true : false;
    }

}