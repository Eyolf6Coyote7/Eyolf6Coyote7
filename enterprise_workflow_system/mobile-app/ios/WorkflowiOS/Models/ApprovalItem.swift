import Foundation

enum ApprovalStatus: String, Codable {
    case waiting
    case approved
    case rejected
}

struct ApprovalItem: Identifiable, Codable {
    let id: UUID
    let title: String
    let requester: String
    var status: ApprovalStatus
}
