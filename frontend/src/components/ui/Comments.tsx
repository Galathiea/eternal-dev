export const Comments = () => {
    const comments = [
      {
        name: "Entity Wilson",
        date: "Here’s 2023",
        comment: "Has anyone tried this with dietary alternatives? I’m wondering if it works just as well.",
        helpful: 5,
      },
      {
        name: "James Rodriguez",
        date: "Join 19, 2023",
        comment: "I added some protein and it was amazing! Highly recommend for a boost.",
        helpful: 7,
      },
      {
        name: "Current User",
        date: "Join 1, 2023",
        comment: "I found that adding a splash of something extra really enhances the flavor. Anyone else try this?",
        helpful: 5,
      },
    ];
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-xl font-bold">Comments (3)</h2>
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div key={index}>
              <h3 className="font-semibold">{comment.name}</h3>
              <p className="text-gray-600">{comment.date}</p>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
              <div className="flex items-center mt-2">
                <span className="mr-2 text-gray-600">Helpful ({comment.helpful})</span>
                <button className="text-blue-500 hover:text-blue-700">Report</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };