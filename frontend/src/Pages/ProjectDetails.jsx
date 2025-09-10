import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactCompareImage from "react-compare-image";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error("Error fetching project:", err));
  }, [id]);

  if (!project) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/portfolio" className="text-blue-600 underline mb-4 block">
        ← Back to Portfolio
      </Link>

      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>

      {/* Before / After */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Before / After</h2>
        <ReactCompareImage
          leftImage={project.beforeImage}
          rightImage={project.afterImage}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-100 rounded-lg"><strong>Brand:</strong> {project.brand}</div>
        <div className="p-4 bg-gray-100 rounded-lg"><strong>Type:</strong> {project.type}</div>
        <div className="p-4 bg-gray-100 rounded-lg"><strong>Service:</strong> {project.service}</div>
      </div>

      {/* Review */}
      {project.review && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">Client Review</h2>
          <p className="italic">“{project.review.text}”</p>
          <p className="mt-2 font-bold">- {project.review.client}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
