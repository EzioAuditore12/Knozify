import { Text } from "@/components/ui";
import { InputOTP } from "@/components/ui/input-otp";
import { Container } from "@/components/ui/layout";
import React from "react";

export default function ForgotPassword (){
	const handleOTPChange = (value: string) => {
		console.log("OTP value:", value);
	};

	const handleOTPComplete = (code: string) => {
		console.log("OTP completed:", code);
		// Handle OTP completion logic here
	};

	return (
		<Container centered padded>
			<Text>Register</Text>
			<InputOTP
				maxLength={6}
				onChange={handleOTPChange}
				onComplete={handleOTPComplete}
				variant="outline"
				autofocus={true}
				keyboardType="number-pad"
				className="mt-4"
			/>
		</Container>
	);
};


