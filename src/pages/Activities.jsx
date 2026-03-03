import { Calendar, MapPin, Users } from "lucide-react";

function Activities() {
  const activities = [
    {
      title: "Lớp học Scratch 3.0 cơ bản",
      date: "Thứ 3, 15h30 - 17h00",
      location: "Phòng máy tính 1",
      participants: "20 học sinh",
      status: "Đang diễn ra",
    },
    {
      title: "Lớp Python cho người mới bắt đầu",
      date: "Thứ 5, 15h30 - 17h00",
      location: "Phòng máy tính 2",
      participants: "15 học sinh",
      status: "Đang diễn ra",
    },
    {
      title: "Cuộc thi Lập trình trẻ cấp Phường",
      date: "15/03/2026",
      location: "Hội trường lớn",
      participants: "30 thí sinh",
      status: "Sắp diễn ra",
    },
    {
      title: "Workshop: Làm quen với AI",
      date: "20/03/2026",
      location: "Phòng Tin học",
      participants: "50 học sinh",
      status: "Sắp diễn ra",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Hoạt động CLB
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {activity.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activity.status === "Đang diễn ra"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {activity.status}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                {activity.date}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {activity.location}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                {activity.participants}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
