interface CommentsSectionProps {
    recipeId: string
    initialComments: {
      id: string
      author: {
        name: string
        image?: string
        isCurrentUser: boolean
      }
      content: string
      date: Date
      helpful: number
      isHelpfulByUser: boolean
    }[]
  }
  
const CommentsSection: React.FC<CommentsSectionProps> = ({  }) => {
    return (
      <div>
        {/* Comments section implementation */}
      </div>
    )
  }
  

export default CommentsSection;