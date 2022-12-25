
// import HomeIcon from '@mui/icons-material/Home';
// import PollIcon from '@mui/icons-material/Poll';
import AssessmentIcon from '@mui/icons-material/Assessment';

const hContain = () => {

    return (
        <div className="hContain">
            <AssessmentIcon className="nbicon"></AssessmentIcon>
            <div className="nbtext" >電力交易輔助系統</div>

            <div className="content">
                <div className="content1">
                    <p1>輔助性軟體的支援 使USER更加直覺且方便使用</p1>
                </div>
                <div className="content2">
                    <p3>1. 預估台電公司尖峰備轉容量率</p3>
                </div>
                <div className="content3">
                    <p3>2. 通過line群組預告備轉容量率不足的警示訊息</p3>
                </div>
                <div className="content4">
                    <p3>3. 輔助電力交易平台輔助服務進行用電尖峰的削峰填谷</p3>
                </div>
                <div className="content5">
                    <p3>4. 提供電力交易平台輔助服務結算價金歷史成交價</p3>
                </div>
                <div className="content6">
                    <p3>5. 提供即時的電力交易平台輔助服務結算價金估算</p3>
                </div>
            </div>
        </div>
    )
}
export default hContain;