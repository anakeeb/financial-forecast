function minMaxScalar(data) {
	let min = Number.MAX_SAFE_INTEGER
	let max = 0
    for(let i = 0; i < data.length; i++) {
    	if (data[0] >= max) {
    		max = data[0]
    	}
    	if (data[0] <= min) {
    		min = data[0]
    	}
    }
    let scaledData = data.map((value) => {
        return (value - min) / (max - min)
    })
    return {
    	data: scaledData,
    	min: min,
    	max: max
    }
}

function minMaxInverseScalar(data, min, max) {
    let scaledData = data.map((value) => {
        return value * (max - min) + min
    })

    return {
        data: scaledData,
        min: min,
        max: max
    }
}

function processData(prices, dates, timePortion) {
	let scaled = minMaxScalar(prices)
	let size = prices.length
	let trainX = []
	let trainY = []

    try {
        for (let i = timePortion; i < size; i++) {
            for (let j = (i - timePortion); j < i; j++) {
                trainX.push(scaled.data[j])
            }
            trainY.push(scaled.data[i])
        }
    }
    catch (ex) {
        console.log(ex);
    }

    return {
    	size: (size - timePortion),
        timePortion: timePortion,
        trainX: trainX,
        trainY: trainY,
        min: scaled.min,
        max: scaled.max,
        originalData: prices
    }
}