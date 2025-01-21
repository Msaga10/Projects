import notificaionImg from "../assets/notification-24.png"

function Notification() {
    return(
        <div>
            <div>
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
            .animate-blink {
            animation: blink 2s infinite;
          }
        `}
      </style>
      <div className="animate-blink text-red-500">
        <img src={notificaionImg} alt="" />
      </div>
    </div>
        </div>
    )
}
export default Notification