import { StatusBar } from 'expo-status-bar';
import { use, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
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
  const gap = 300;
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleNegHeight, setRandomHeight] = useState(0);
  let obstacleTimerId;

  const [obstacleLeftTwo, setObstacleLeftTwo] = useState(
    screenWidth + screenWidth / 2 );

    const [obstacleNegHeightTwo, setRandomHeightTwo] = useState(0);

    let obstacleTimerIdTwo;

    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameOver=()=>{
      setIsGameOver(true);
      clearInterval(gameTimerId);
      clearInterval(obstacleTimerId);
      clearInterval(obstacleTimerIdTwo);
    }


    //jump +50 pixels
    const jump = () => {
      if (!isGameOver && birdBottom < screenHeight) {
        setBirdBottom((b) => b + 50);
      }
    }

    useEffect(() => {
      if (obstacleLeft > -obstacleWidth) {
        obstacleTimerId = setInterval(() => {
          setObstacleLeft((left) => left - 5);
        },30);
        return () =>  clearInterval(obstacleTimerId);
        }else{
           setScore((s) => s + 1);
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
          setScore((s) => s + 1);
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

useEffect(() => {
  if (
    (birdBottom < obstacleNegHeight + obstacleHeight + 30 ||
    birdBottom > obstacleNegHeight + obstacleHeight + gap - 30 &&
    obstacleLeft > screenWidth / 2 - 30 &&
    obstacleLeft < screenWidth / 2 + 30
  ) ||(
    (
      birdBottom < obstacleNegHeightTwo + obstacleHeight + 30 ||
    birdBottom > obstacleNegHeightTwo + obstacleHeight + gap - 30 &&
    obstacleLeftTwo > screenWidth / 2 - 30 &&
    obstacleLeftTwo < screenWidth / 2 + 30
  )
)  ){
    gameOver();
}
},[birdBottom,
  obstacleLeft,
  obstacleNegHeight,
  obstacleLeftTwo,
  obstacleNegHeightTwo,
  isGameOver
]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
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
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  score: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    zIndex: 10,
  }
});
