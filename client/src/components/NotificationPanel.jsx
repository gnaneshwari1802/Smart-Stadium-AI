import { useMemo } from "react";
import {
  AlertTriangle,
  Car,
  CloudSun,
  UtensilsCrossed,
  Users,
  CheckCircle2,
} from "lucide-react";

function NotificationPanel({ stadiumData }) {
  const notifications = useMemo(() => {
    if (!stadiumData) return [];

    const alerts = [];

    // Parking Alerts
    Object.entries(stadiumData.parking || {}).forEach(([lot, occupancy]) => {
      if (occupancy >= 90) {
        alerts.push({
          type: "danger",
          title: `Parking ${lot} Almost Full`,
          message: `Parking ${lot} has reached ${occupancy}% occupancy.`,
          icon: <Car size={20} />,
        });
      } else if (occupancy >= 75) {
        alerts.push({
          type: "warning",
          title: `Parking ${lot} Busy`,
          message: `Parking ${lot} is ${occupancy}% occupied.`,
          icon: <Car size={20} />,
        });
      }
    });

    // Food Queue Alerts
    (stadiumData.food || []).forEach((stall) => {
      if (stall.wait >= 15) {
        alerts.push({
          type: "warning",
          title: `${stall.name} Queue`,
          message: `${stall.wait} minute waiting time.`,
          icon: <UtensilsCrossed size={20} />,
        });
      }
    });

    // Crowd Alerts
    if (stadiumData.visitors > 45000) {
      alerts.push({
        type: "danger",
        title: "High Crowd Density",
        message:
          "Visitor count is high. Additional security deployment recommended.",
        icon: <Users size={20} />,
      });
    }

    // Weather Alerts
    if (stadiumData.weather?.temperature >= 35) {
      alerts.push({
        type: "warning",
        title: "High Temperature",
        message:
          "Provide drinking water and shaded seating for spectators.",
        icon: <CloudSun size={20} />,
      });
    }

    // Everything Normal
    if (alerts.length === 0) {
      alerts.push({
        type: "success",
        title: "Operations Normal",
        message: "No critical alerts at the moment.",
        icon: <CheckCircle2 size={20} />,
      });
    }

    return alerts;
  }, [stadiumData]);

  const getStyle = (type) => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-50",
          border: "border-red-300",
          icon: "text-red-600",
          title: "text-red-700",
        };

      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-300",
          icon: "text-yellow-600",
          title: "text-yellow-700",
        };

      default:
        return {
          bg: "bg-green-50",
          border: "border-green-300",
          icon: "text-green-600",
          title: "text-green-700",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="text-orange-500" />
        <h2 className="text-2xl font-bold">
          Live Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const style = getStyle(notification.type);

          return (
            <div
              key={index}
              className={`${style.bg} ${style.border} border rounded-xl p-4`}
            >
              <div className="flex gap-3">

                <div className={style.icon}>
                  {notification.icon}
                </div>

                <div>
                  <h3 className={`font-semibold ${style.title}`}>
                    {notification.title}
                  </h3>

                  <p className="text-gray-700 text-sm mt-1">
                    {notification.message}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationPanel;
