export const Dialog = ({ open, onOpenChange, children }: any) => {
    return open ? (
      <div className="dialog">
        <div className="dialog-overlay" onClick={() => onOpenChange(false)} />
        <div className="dialog-content">{children}</div>
      </div>
    ) : null
  }
  
  export const DialogContent = ({ children }: any) => <div className="dialog-content">{children}</div>
  export const DialogHeader = ({ children }: any) => <div className="dialog-header">{children}</div>
  export const DialogTitle = ({ children }: any) => <h2 className="dialog-title">{children}</h2>
  export const DialogDescription = ({ children }: any) => <p className="dialog-description">{children}</p>
  export const DialogFooter = ({ children }: any) => <div className="dialog-footer">{children}</div>