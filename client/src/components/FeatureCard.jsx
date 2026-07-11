function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;