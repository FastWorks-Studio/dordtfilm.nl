export class UUIDGenerator {

    private lut: string[] = function() {
        let value: string[] = [];
        for (var i=0; i<256; i++ ) { 
            value[i] = (i<16?'0':'') + (i).toString(16); 
        }
        return value
    }();

    private static count: number = 0;
    
    static get uuid(): string {
        UUIDGenerator.count += 1;
        return UUIDGenerator.count.toFixed(0);
    }
}