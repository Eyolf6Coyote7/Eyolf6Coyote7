import Foundation

enum WorkflowStatus: String, Codable {
    case pending
    case approved
    case rejected
}

struct WorkflowRequest: Identifiable, Codable {
    let id: UUID
    let title: String
    let status: WorkflowStatus
    let requester: String
    let date: Date
}
