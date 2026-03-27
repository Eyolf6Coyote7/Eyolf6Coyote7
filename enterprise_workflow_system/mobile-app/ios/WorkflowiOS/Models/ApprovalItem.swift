import Foundation
import SwiftUI

struct ApprovalItem: Identifiable {
    let id: String
    let title: String
    let description: String
    let requester: String
    let department: String
    let amount: String
    let priority: String
    let date: String

    var priorityColor: Color {
        switch priority {
        case "Urgent": return Color(hex: "F56C6C")
        case "High": return Color(hex: "E6A23C")
        case "Medium": return Color(hex: "0060A9")
        default: return Color(hex: "909399")
        }
    }

    var priorityBgColor: Color {
        switch priority {
        case "Urgent": return Color(hex: "FEF0F0")
        case "High": return Color(hex: "FDF6EC")
        case "Medium": return Color(hex: "E6F1FC")
        default: return Color(hex: "E6E8EB")
        }
    }
}

struct NotificationItem: Identifiable {
    let id: String
    let title: String
    let body: String
    let type: String
    let time: String
    let isNew: Bool

    var iconColor: Color {
        switch type {
        case "approved", "completed": return Color(hex: "22C55E")
        case "approval_required", "comment": return Color(hex: "0060A9")
        case "escalation": return Color(hex: "F97316")
        case "rejected": return Color(hex: "BA1A1A")
        default: return Color(hex: "94A3B8")
        }
    }

    var iconName: String {
        switch type {
        case "approved", "completed": return "checkmark"
        case "approval_required": return "person.fill"
        case "escalation": return "exclamationmark.triangle.fill"
        case "comment": return "bubble.left.fill"
        case "rejected": return "xmark"
        default: return "bell.fill"
        }
    }
}
