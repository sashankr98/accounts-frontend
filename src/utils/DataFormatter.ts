export class DataFormatter {
    static formatCurrencyValue = (value: number | undefined): string => {
        if (value === undefined) return '';
        return `$ ${value.toLocaleString()}`;
    };

    private static DATE_FORMAT = Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    });

    static formatDate = (date: number): string => this.DATE_FORMAT.format(new Date(date));
}
