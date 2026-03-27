import Foundation
import SwiftUI

enum WorkflowStatus: String, Codable {
    case pending = "Pending"
    case inProgress = "In Progress"
    case approved = "Approved"
    case rejected = "Rejected"
    case cancelled = "Cancelled"

    var color: Color {
        switch self {
        case .pending: return Color(hex: "E6A23C")
        case .inProgress: return Color(hex: "409EFF")
        case .approved: return Color(hex: "67C23A")
        case .rejected: return Color(hex: "F56C6C")
        case .cancelled: return Color(hex: "909399")
        }
    }

    var bgColor: Color {
        switch self {
        case .pending: return Color(hex: "FFF7EB")
        case .inProgress: return Color(hex: "ECF5FF")
        case .approved: return Color(hex: "F0F9EB").opacity(0.5)
        case .rejected: return Color(hex: "FFDAD6")
        case .cancelled: return Color(hex: "E6E8EB")
        }
    }
}

struct WorkflowRequest: Identifiable {
    let id: String
    let title: String
    let type: String
    let status: WorkflowStatus
    let date: String
    let amount: String
    let submitter: String
    let department: String

    var borderColor: Color { status.color }
}

// Color extension for hex
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6: (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(.sRGB, red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255, opacity: Double(a) / 255)
    }
}
