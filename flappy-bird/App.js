import { StatusBar } from 'expo-status-bar';
import { use, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './src/components/Bird';
import Obstacles from './src/components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);

  const gravity = 3;

  let gameTimerId;

  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleNegHeight, setRandomHeight] = useState(0);
  let obstacleTimerId;

  const [obstacleLeftTwo, setObstacleLeftTwo] = useState(
    screenWidth + screenWidth / 2 );

    const [obstacleNegHeightTwo, setRandomHeightTwo] = useState(0);

    let obstacleTimerIdTwo;

    useEffect(() => {
      if (obstacleLeft > -obstacleWidth) {
        obstacleTimerId = setInterval(() => {
          setObstacleLeft((left) => left - 5);
        },30);
        return () =>  clearInterval(obstacleTimerId);
        }else{
          setObstacleLeft(screenWidth);
          setObstacleHeight(-Math.random() * 100);
        }
    }, [obstacleLeft]);

    useEffect(() => {
      if (obstacleLeftTwo > -obstacleWidth) {
        obstacleTimerIdTwo = setInterval(() => {
          setObstacleLeftTwo((left) => left - 5);
        },30);
        return () =>  clearInterval(obstacleTimerIdTwo);
        }else{
          setObstacleLeftTwo(screenWidth);
          setObstacleNegHeightTwo(-Math.random() * 100);
        }
    }, [obstacleLeftTwo]);


  //bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
    
    return () => {
      clearInterval(gameTimerId);
    }
    }
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

      <Obstacles
        color={'green'}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        obstacleLeft={obstacleLeft}
        gap={gap}
        randomBottom={obstacleNegHeight}

      ></Obstacles>

      <Obstacles
        color={'red'}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        obstacleLeft={obstacleLeftTwo}
        randomBottom={obstacleNegHeightTwo}
        ></Obstacles>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
