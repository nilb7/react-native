import react from "react";
import { Text } from "react-native-web";
import StudentInfo from "../components/StudentInfo";

function ProfileScreen() {
    return(
        <View>
            <StudentInfo
            fullname={"John Doe"}
            position={"Software Engineer"}
            desc="Passionate developer with 5 years of experience in mobile and web applications."
            profileImage={require("")}>

            </StudentInfo>
        </View>
    )
}

export default ProfileScreen;   