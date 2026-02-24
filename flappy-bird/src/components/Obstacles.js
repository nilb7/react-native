import Reect from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacles = (
    {
        color,
        obstacleHeight,
        obstacleWidth,
        randomBottom,
        gap,
        obstacleLeft,
    }
)=>
{
    return(
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstacleLeft,
                bottom: randomBottom+gap+obstacleHeight,
            }}>

            </View>

            <View style={{
                    position: 'absolute',
                    backgroundColor: color,
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstacleLeft,
                    bottom: randomBottom
            }}>

            </View>


        </>

    )
};

export default Obstacles;