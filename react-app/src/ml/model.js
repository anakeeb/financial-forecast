import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

function getModel() {
	console.log('getModel')
	const model = tf.sequetial()

	model.add(tf.layers.inputLayer({
		inputShape: [7,1]
	}))

    model.add(tf.layers.conv1d({
        kernelSize: 2,
        filters: 128,
        strides: 1,
        use_bias: true,
        activation: 'relu',
        kernelInitializer: 'VarianceScaling'
    }))

    model.add(tf.layers.averagePooling1d({
        poolSize: [2],
        strides: [1]
    }))

    model.add(tf.layers.conv1d({
        kernelSize: 2,
        filters: 64,
        strides: 1,
        use_bias: true,
        activation: 'relu',
        kernelInitializer: 'VarianceScaling'
    }))

    model.add(tf.layers.averagePooling1d({
        poolSize: [2],
        strides: [1]
    }))

    model.add(tf.layers.flatten({

    }))

    model.add(tf.layers.dense({
        units: 1,
        kernelInitializer: 'VarianceScaling',
        activation: 'linear'
    }))

    return model
}
