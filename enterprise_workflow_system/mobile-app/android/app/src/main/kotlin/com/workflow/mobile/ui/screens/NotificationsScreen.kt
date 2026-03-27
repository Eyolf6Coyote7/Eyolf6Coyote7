package com.workflow.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.workflow.mobile.data.MockData
import com.workflow.mobile.data.Notification
import com.workflow.mobile.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotificationsScreen(onBack: () -> Unit) {
    val newNotifs = MockData.notifications.filter { it.isNew }
    val oldNotifs = MockData.notifications.filter { !it.isNew }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Notifications", fontWeight = FontWeight.Bold, fontSize = 17.sp, letterSpacing = (-0.425).sp) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Default.ArrowBack, contentDescription = "Back") } },
                actions = { TextButton(onClick = {}) { Text("Mark All Read", color = ActiveBlue, fontWeight = FontWeight.Medium) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding).background(BgSurface),
            contentPadding = PaddingValues(vertical = 15.dp)
        ) {
            item {
                Text("New", modifier = Modifier.padding(horizontal = 16.dp), fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextSecondary, letterSpacing = 0.65.sp)
                Spacer(modifier = Modifier.height(8.dp))
            }
            items(newNotifs) { n -> NotificationItem(n) }
            item {
                Spacer(modifier = Modifier.height(15.dp))
                Text("Earlier", modifier = Modifier.padding(horizontal = 16.dp), fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextSecondary, letterSpacing = 0.65.sp)
                Spacer(modifier = Modifier.height(8.dp))
            }
            items(oldNotifs) { n -> NotificationItem(n) }
        }
    }
}

@Composable
private fun NotificationItem(n: Notification) {
    val iconColor = when (n.type) {
        "approved", "completed" -> Color(0xFF22C55E)
        "approval_required", "comment" -> PrimaryDark
        "escalation" -> Color(0xFFF97316)
        "rejected" -> DangerDark
        else -> Color(0xFF94A3B8)
    }

    Surface(color = Color.White) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Blue dot for new
            if (n.isNew) {
                Box(modifier = Modifier.size(8.dp).offset(x = (-12).dp).clip(CircleShape).background(Primary).align(Alignment.CenterVertically))
            }

            // Icon
            Box(
                modifier = Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(iconColor.copy(alpha = if (n.isNew) 1f else 0.6f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    when (n.type) {
                        "approved", "completed" -> Icons.Default.Check
                        "approval_required" -> Icons.Default.Person
                        "escalation" -> Icons.Default.Warning
                        "comment" -> Icons.Default.ChatBubble
                        "rejected" -> Icons.Default.Close
                        else -> Icons.Default.Notifications
                    },
                    contentDescription = null, tint = Color.White, modifier = Modifier.size(16.dp)
                )
            }

            // Content
            Column(modifier = Modifier.weight(1f)) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(n.title, fontSize = 15.sp, fontWeight = if (n.isNew) FontWeight.Bold else FontWeight.Normal, color = if (n.isNew) TextPrimary else TextSecondary)
                    Text(n.time, fontSize = 12.sp, color = TextMuted)
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(n.body, fontSize = 14.sp, color = if (n.isNew) TextSecondary else TextMuted, lineHeight = 21.sp)
            }

            // Chevron
            Icon(Icons.Default.ChevronRight, contentDescription = null, tint = TextMuted, modifier = Modifier.size(8.dp).align(Alignment.CenterVertically))
        }
        HorizontalDivider(color = Color(0xFFC0C7D4).copy(alpha = 0.15f))
    }
}
