class LocalHelper {
    static getRandomTimestamp(): number {
        let time = localStorage.getItem("randomTimestamp");
        return time ? parseInt(time) : 0;
    }

    static updateRandomTimestamp() {
        let time = new Date();
        localStorage.setItem("randomTimestamp", time.getTime().toString());
    }

    static setData(dataStr: string) {
        localStorage.setItem("data", dataStr);
    }

    static getData(): string {
        let data = localStorage.getItem("data");
        return data ? data : "";
    }
}