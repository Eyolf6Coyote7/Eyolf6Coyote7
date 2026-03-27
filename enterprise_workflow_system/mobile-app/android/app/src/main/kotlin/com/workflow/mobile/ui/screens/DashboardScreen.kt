package com.workflow.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.workflow.mobile.data.MockData
import com.workflow.mobile.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(onNavigateToApprovals: () -> Unit, onLogout: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Dashboard", fontWeight = FontWeight.Bold, fontSize = 20.sp) },
                navigationIcon = {
                    IconButton(onClick = {}) {
                        Icon(Icons.Default.Menu, contentDescription = "Menu", tint = Color(0xFF64748B))
                    }
                },
                actions = {
                    BadgedBox(badge = { Badge { Text("3") } }) {
                        IconButton(onClick = {}) {
                            Icon(Icons.Default.Notifications, contentDescription = "Notifications", tint = Color(0xFF64748B))
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White.copy(alpha = 0.8f))
            )
        },
        bottomBar = {
            NavigationBar(containerColor = Color.White.copy(alpha = 0.8f)) {
                NavigationBarItem(selected = true, onClick = {}, icon = { Icon(Icons.Default.Home, contentDescription = null) }, label = { Text("Home", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = onNavigateToApprovals, icon = {
                    BadgedBox(badge = { Badge { Text("5") } }) { Icon(Icons.Default.Checklist, contentDescription = null) }
                }, label = { Text("Queue", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Description, contentDescription = null) }, label = { Text("Requests", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Person, contentDescription = null) }, label = { Text("Profile", fontSize = 10.sp) })
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding).background(BgPage),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Greeting
            item {
                Column {
                    Text("Good morning, Wei", fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, color = TextPrimary, letterSpacing = (-0.6).sp)
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("You have", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = TextSecondary.copy(alpha = 0.8f))
                        Text("3 pending approvals", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = PrimaryDark)
                    }
                }
            }

            // Stats Grid
            item {
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        StatCard(Modifier.weight(1f), "Pending", "3", Color(0xFF8B5000))
                        StatCard(Modifier.weight(1f), "Active", "7", PrimaryDark)
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        StatCard(Modifier.weight(1f), "Approved", "28", Success)
                        StatCard(Modifier.weight(1f), "Avg Time", "4.2h", TextPrimary)
                    }
                }
            }

            // Pending Approvals Header
            item {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Bottom) {
                    Text("Pending Approvals", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    TextButton(onClick = onNavigateToApprovals) {
                        Text("See All", fontWeight = FontWeight.Bold, color = PrimaryDark)
                        Icon(Icons.Default.ChevronRight, contentDescription = null, tint = PrimaryDark, modifier = Modifier.size(16.dp))
                    }
                }
            }

            // Approval Cards
            items(MockData.approvals.take(3)) { approval ->
                ApprovalCard(approval)
            }
        }
    }
}

@Composable
private fun StatCard(modifier: Modifier = Modifier, label: String, value: String, valueColor: Color) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = Brush.linearGradient(listOf(Color(0xFFC0C7D4).copy(alpha = 0.1f), Color(0xFFC0C7D4).copy(alpha = 0.1f))))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(label, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary, letterSpacing = 0.6.sp)
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(value, fontSize = 28.sp, fontWeight = FontWeight.ExtraBold, color = valueColor)
        }
    }
}

@Composable
private fun ApprovalCard(approval: com.workflow.mobile.data.Approval) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            // ID + Title + Time
            Column {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("#${approval.id}", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = PrimaryDark, letterSpacing = 0.275.sp)
                    Text(approval.date, fontSize = 12.sp, color = TextMuted)
                }
                Spacer(modifier = Modifier.height(2.dp))
                Text(approval.title, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            }

            // Requester + Amount
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Box(modifier = Modifier.size(32.dp).clip(CircleShape).background(Color(0xFFECEEF1)), contentAlignment = Alignment.Center) {
                        Text(approval.requester.first().toString(), fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                    Column {
                        Text(approval.requester, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text("${approval.department} Department", fontSize = 12.sp, color = TextSecondary)
                    }
                }
                Column(horizontalAlignment = Alignment.End) {
                    Text(approval.amount, fontSize = 14.sp, fontWeight = FontWeight.ExtraBold, color = TextPrimary)
                    Text(approval.priority, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = if (approval.priority == "High") Warning else TextMuted)
                }
            }

            // Action Buttons
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Button(
                    onClick = {},
                    modifier = Modifier.weight(1f).height(46.dp),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Success)
                ) {
                    Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(12.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Approve", fontWeight = FontWeight.Bold)
                }
                OutlinedButton(
                    onClick = {},
                    modifier = Modifier.weight(1f).height(46.dp),
                    shape = RoundedCornerShape(8.dp),
                    border = ButtonDefaults.outlinedButtonBorder.copy(width = 1.dp, brush = Brush.linearGradient(listOf(DangerDark.copy(alpha = 0.2f), DangerDark.copy(alpha = 0.2f)))),
                ) {
                    Icon(Icons.Default.Close, contentDescription = null, tint = DangerDark, modifier = Modifier.size(11.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Reject", fontWeight = FontWeight.Bold, color = DangerDark)
                }
            }
        }
    }
}
