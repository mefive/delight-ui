export function getOffset(element) {
    const top 
    = Math.round(element.getBoundingClientRect().top + document.body.scrollTop);

    const left
    = Math.round(element.getBoundingClientRect().left + document.body.scrollLeft);

    return {
        top,
        left
    };
};

export function addClass(element, className) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
};

function decimalLength(str) {
    var parts = ('' + str).split('.');

    return parts.length === 2 ? parts[1].length : 0;
}

function float2Int(float, length) {
    var parts = ('' + float).split('.');
    var result;

    if (length >= 0) {}
    else {
        length = 0;
    }

    if (parts.length === 1) {
        result = float + new Array(length + 1).join('0');
    }
    else {
        length = Math.max(0, length - parts[1].length);
        result = parts.join('') + new Array(length + 1).join('0');
    }

    return + result;
}

export function plus(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return (a + b) / Math.pow(10, length);
};

export function minus(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return (a - b) / Math.pow(10, length);
};

export function multiply(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    var factor = Math.pow(10, length);

    return (a * b) / (factor * factor);
};

export function divide(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return a / b;
};

export function sortBy(dataSource, sortByField, order) {
    return dataSource.sort((a, b) => {
        const aValue = a[sortByField];
        const bValue = b[sortByField];

        if (aValue === bValue) {
            return 0;
        }

        if (aValue > bValue) {
            if (order === 'asc') {
                return 1;
            }
            else {
                return -1;
            }
        }

        else {
            if (order === 'asc') {
                return -1;
            }
            else {
                return 1;
            }
        }
    });
};
