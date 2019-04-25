// Node modules.
import * as React from 'react';

function Toolbox(props: { joycons: any[] }) {
    const { joycons } = props;

    const [imuAvailable, setIMUAvailable] = React.useState(false);
    const [vibrationAvailable, setVibrationAvailable] = React.useState(false);

    const enableIMU = () => {
        joycons.forEach(async (device) => {
            imuAvailable
                ? await device.disableIMU()
                : await device.enableIMU();
            setIMUAvailable(!imuAvailable);
        });
    }

    const enableVibration = () => {
        joycons.forEach(async (device) => {
            vibrationAvailable
                ? await device.disableVibration()
                : await device.enableVibration();
            setVibrationAvailable(!vibrationAvailable);
        });
    }

    return (
        <>
            <button onClick={enableIMU}>
                {imuAvailable
                    ? `Disable IMU`
                    : `Enable IMU`
                }
            </button>
            <button onClick={enableVibration}>
                {vibrationAvailable
                    ? `Disable Vibration`
                    : `Enable Vibration`
                }
            </button>
        </>
    );
}

export default Toolbox;
